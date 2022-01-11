from django.http import HttpResponse
import datetime
from .models import Post, User, Comment, Company, UserProfile, Learn, Watchlist, Ticker, Portfolio, Note, Connection, Reaction, StockDetails, Price
from django.shortcuts import render,get_object_or_404, get_list_or_404
from .forms import CommentForm, UserRegistrationForm, PostForm, PostForm_new
from django.views import generic
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from django import forms
from django.http import JsonResponse
from rest_framework.response import Response 
from . serializers import PostSerializer, CreatePostSerializer, CommentSerializer, CompanySerializer, TickerSerializer, NoteSerializer, CreateNoteSerializer, ReactionSerializer, ConnectionSerializer, UserProfileSerializer, WatchlistSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.http import Http404
from rest_framework import generics, permissions
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, PortfolioSerializer, StockDetailsSerializer
from django.core.exceptions import MultipleObjectsReturned


class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class UserAPIView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    
@api_view(['POST'])
def api_kite_tickers(request):
    companies = Company.objects.all()
    serializer = CompanySerializer(companies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def api_companies(request, ticker_id=None):
    if ticker_id:
        ticker = get_object_or_404(Ticker, ticker_id=ticker_id)
        try:
            company = Company.objects.get(ticker_id=ticker)
        except Company.DoesNotExist:
            company = Company(ticker_id=ticker)
        serializer = CompanySerializer(company)
        return Response(serializer.data)
    else:
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def api_valuations(request, ticker_id=None):
    ticker = get_object_or_404(Ticker, ticker_id=ticker_id)
    try:
        valuations = StockDetails.objects.get(ticker_id=ticker)
    except StockDetails.DoesNotExist:
        valuations = StockDetails(ticker_id=ticker)
    serializer = StockDetailsSerializer(valuations)
    return Response(serializer.data)
    
    
@api_view(['GET'])
def api_tickers(request):
    tickers = Ticker.objects.all()
    serializer = TickerSerializer(tickers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def api_userprofiles(request):
    userprofiles = UserProfile.objects.all()
    serializer = UserProfileSerializer(userprofiles, many=True)
    return Response(serializer.data)


def index(request):
    return render(request, 'busybeaver/home.html')


def home(request):
     context = {'company_name': 'busybeaver','user1': 'vasu'}
     return JsonResponse(context)
    
def learn(request):
    return render(request, 'busybeaver/learn.html')

def get_posts_by_ticker(ticker_id):
    if ticker_id == None:
        posts_list = Post.objects.order_by('-pub_date')
    else:
        # filter all posts which have a particular ticker_id
        posts_list = filter( lambda post : ticker_id in [x.ticker_id for x in post.tag.all()]  , Post.objects.order_by('-pub_date'))
    return posts_list

#Renders feed of posts
def universal_feed(request, ticker_id = None):
    thisuser = None
    for user in UserProfile.objects.all():
        if user.user.username == request.user.username:
            thisuser = user
    comment_form = CommentForm()
    context = {'posts_list': get_posts_by_ticker(ticker_id),'user1': thisuser, 'comment_form': comment_form}
    return render(request, 'busybeaver/feed.html', context)

@api_view(['GET'])
def api_universal_feed(request, ticker_id = None):
    data = get_posts_by_ticker(ticker_id)
    serializer = PostSerializer(data, many=True)
    return Response(serializer.data)


def get_notes_by_ticker(ticker_id, username):
    notes_list = filter( lambda note : username == note.user.username  , Note.objects.order_by('-pub_date'))
    if ticker_id == None:
        pass
    else:
        # filter all posts which have a particular ticker_id
        notes_list = filter( lambda note : ticker_id in [x.ticker_id for x in note.tag.all()]  , notes_list)
    return notes_list


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def api_companies_notes(request):
    user = request.user
    if request.method == 'GET':
        data = get_notes_by_ticker(None, user.username)
        ret = set()
        for note in data:
            for ticker in note.tag.all():
                ret.add(ticker)
        serializer = TickerSerializer(ret, many=True)
        return Response(serializer.data)


@api_view(['GET'])
# @permission_classes((permissions.IsAuthenticated,))
def api_company_holders(request):
    if request.method == 'GET':
        ticker_id = request.GET.get('ticker_id', '')
        print("param", ticker_id)
        if ticker_id == '':
            return Response(status=status.HTTP_400_BAD_REQUEST)
        ticker = get_object_or_404(Ticker, ticker_id=ticker_id)
        print(ticker)
        print(Portfolio.objects.filter(ticker_id=ticker))
        holders = [x.user.profile.first() for x in Portfolio.objects.filter(ticker_id=ticker)]
        print(holders)
        serializer = UserProfileSerializer(holders, many=True)
        return Response(serializer.data)



@api_view(['GET','POST','PUT','DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def api_notes(request, ticker_id=None):
    user = request.user
    if request.method == 'POST':
        serializer = CreateNoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['user'] = user
            serializer.validated_data['slug'] = serializer.validated_data['title'].replace(' ', '-')
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        data = get_notes_by_ticker(ticker_id, user.username)
        serializer = NoteSerializer(data, many=True)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        slug = request.data['slug']
        note = get_object_or_404(Note, slug=slug, user=user)
        note.delete()
        return Response(status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        slug = request.data['slug']
        note = get_object_or_404(Note, slug=slug, user=user)
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'PUT'])
@permission_classes((permissions.IsAuthenticated,))
def api_userprofile(request):
    user = request.user
    if request.method == 'GET':
        username = request.GET.get('username', request.user.username)
        user = get_object_or_404(User, username = username)
        #TODO check unique constraint
        serializer = UserProfileSerializer(user.profile.first(), many=False)
        return Response(serializer.data)
    elif request.method == 'POST':
        # TODO unique username
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['user'] = user
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        userprofile = get_object_or_404(UserProfile, user=user)
        serializer = UserProfileSerializer(userprofile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status = status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        
@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def api_user_posts(request):
    username = request.GET.get('username', request.user.username)
    if request.method == 'GET':
        posts_list = filter( lambda post : username == post.author.user.username  , Post.objects.all())
        serializer = PostSerializer(posts_list, many=True)
        return Response(serializer.data)

    

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def api_watchlist(request):
    user = request.user
    if request.method == 'GET':
        username = request.GET.get('username', request.user.username)
        user = get_object_or_404(User, username = username)
        #TODO unqiue connection only
        serializer = WatchlistSerializer(user.watchlist, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        #TODO : make all save atomic
        for datum in request.data:
            serializer = WatchlistSerializer(data=datum)
            if serializer.is_valid():
                serializer.validated_data['user'] = user
                # TODO enforce unique ticker per user
                serializer.save()
            else:
                print(serializer.errors)
                return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_201_CREATED)
    elif request.method == 'DELETE':
        #TODO try asserting unique or delete all of them in exception
        ticker_id = request.data['ticker_id']
        ticker = get_object_or_404(Ticker, ticker_id = ticker_id)
        watched = get_object_or_404(Watchlist, user=user, ticker_id=ticker)
        watched.delete()
        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def api_iswatching(request):
    user = request.user
    if request.method == 'POST':
        ticker_id = request.data['ticker_id']
        if ticker_id in [x.ticker_id.ticker_id for x in user.watchlist.all()]:
            return Response(True)
        else:
            return Response(False)


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def api_watchers(request):
    ticker_id = request.data['ticker_id']
    ticker = get_object_or_404(Ticker, ticker_id = ticker_id)
    serializer = UserProfileSerializer([x.user.profile.first() for x in ticker.watchers.all() if x.user.profile.exists()], many=True)
    return Response(serializer.data)

    
@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def api_followers(request):
    username = request.GET.get('username', request.user.username)
    user = get_object_or_404(User, username = username)
    serializer = UserProfileSerializer([x.following_user_id.profile.first() for x in user.followers.all() if x.user_id.profile.exists()], many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def api_following(request):
    username = request.GET.get('username', request.user.username)
    user = get_object_or_404(User, username = username)
    serializer = UserProfileSerializer([x.user_id.profile.first() for x in user.following.all() if x.user_id.profile.exists()], many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def api_follow(request):
    user = request.user
    if request.method == 'POST':
        #TODO unqiue connection only
        serializer = ConnectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['following_user_id'] = user
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def api_unfollow(request):
    user = request.user
    if request.method == 'DELETE':
        #TODO try asserting unique connection or delete all of them in exception
        unfollowed_user = get_object_or_404(User, username=request.data['user_id'])
        connection = get_object_or_404(Connection, user_id=unfollowed_user, following_user_id=user)
        connection.delete()
        return Response(status=status.HTTP_200_OK)
    
        
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def api_isfollowing(request):
    user = request.user
    if request.method == 'POST':
        person = request.data['user_id']
        if person in [x.user_id.username for x in user.following.all()]:
            return Response(True)
        else:
            return Response(False)

    
@api_view(['GET', 'POST', 'DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def api_user_activity(request):
    if request.method == 'GET':
        username = request.GET.get('username', request.user.username)
        user = get_object_or_404(User, username = username)
        serializer = ReactionSerializer(user.activity, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        user = request.user
        slug = request.data['slug']
        serializer = ReactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['user'] = user
            serializer.validated_data['post'] = get_object_or_404(Post, slug=slug)
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user = request.user
        slug = request.data['slug']
        serializer = ReactionSerializer(data=request.data)
        '''
        posts = get_list_or_404(Post, slug=slug)
        for post in posts:    
            reaction = get_object_or_404(Reaction, user=user, post=post)
            reaction.delete()
        '''
        post = get_object_or_404(Post, slug=slug)
        reactions = get_list_or_404(Reaction, user=user, post=post)
        for reaction in reactions:
            reaction.delete()        
        return Response(status=status.HTTP_200_OK)

def tags_as_string(post):
    return ' | '.join([x.ticker_id for x in post.tag.all()])

def company_list(request):
    companies = [company for company in Company.objects.all()]
    tickers = [ticker.ticker_id for ticker in Ticker.objects.all()]
    context = {'companies':companies, 'tickers':tickers}
    return render (request, 'busybeaver/companylist.html', context)

def company_details(request, ticker_id = None):
    thiscompany = None
    for company in Company.objects.all():
            if company.ticker_id.ticker_id == ticker_id:
                thiscompany = company
                break
    context = {'company':thiscompany, 'posts_list':get_posts_by_ticker(ticker_id)}
    return render(request, 'busybeaver/companydetails.html', context)

def profile(request, userid = None):
    if userid == None:
        output = 'No profiles to show'
    else:
        for user in User.objects.all():
            if user.userid == userid:
                output = user.name + '\'s friends are:' + ' and '.join([x.name for x in user.friends.all()])
    return HttpResponse(output)


def createpost(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect('/busybeaver/login/')
    else:
        if request.method == 'GET':
            form = PostForm_new()
            return render(request, 'busybeaver/post_form.html', {'form' : form})
        else:
            form = PostForm(request.POST)
            if form.is_valid():
                new_post = form.save(commit=False)
                new_post.slug = new_post.title.replace(' ', '-')
                new_post.pub_date = datetime.datetime.now()
                for thisuser in UserProfile.objects.all():
                    if thisuser.user.username == request.user.username:
                        new_post.author = thisuser
                new_post.save()
                form.save_m2m()
                return HttpResponseRedirect('/busybeaver/feed')
            else:
                raise forms.ValidationError('Looks like the data you entered is not valid')
                return HttpResponseRedirect('/busybeaver/createpost')


#TODO : remove, obsolete coz of knox            
def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            userObj = form.cleaned_data
            username = userObj['username']
            email =  userObj['email']
            password =  userObj['password']
            if not (User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists()):
                User.objects.create_user(username, email, password)
                user = authenticate(username = username, password = password)
                login(request, user)
                return HttpResponseRedirect('/busybeaver/')    
            else:
                raise forms.ValidationError('Looks like a username with that email or password already exists')
                
    else:
        form = UserRegistrationForm()
        
    return render(request, 'busybeaver/register.html', {'form' : form})
    
class PostDetail(generic.DetailView):
    model = Post
    template_name = 'busybeaver/post_details.html'

def post_detail(request, slug):
    template_name = 'busybeaver/post_details.html'
    post = get_object_or_404(Post, slug=slug)
    comments = post.comments.all()
    new_comment = None
    # Comment posted
    if request.method == 'POST':
        comment_form = CommentForm(data=request.POST)
        if comment_form.is_valid():

            # Create Comment object but don't save to database yet
            data = comment_form.cleaned_data
            new_comment = Comment(body=data['comment'])
            # Assign the current post to the comment
            new_comment.post = post
            for thisuser in UserProfile.objects.all():
                if thisuser.user.username == request.user.username:
                    new_comment.author = thisuser
            # Save the comment to the database
            new_comment.save()
        return HttpResponseRedirect('/busybeaver/feed/')
    else:
        comment_form = CommentForm()

    return render(request, template_name, {'post': post,
                                           'comments': comments,
                                           'new_comment': new_comment,
                                           'comment_form': comment_form})
@api_view(['GET', 'PUT', 'DELETE'])
def api_post_detail(request, slug):
    if request.method == 'GET':
        post = get_object_or_404(Post, slug=slug)
        serializer = PostSerializer(post)
        return Response(serializer.data)
    elif request.method == 'PUT':
        post = get_object_or_404(Post, slug=slug)
        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        post = get_object_or_404(Post, slug=slug)
        post.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def api_ltp(request):
    auth_user = request.user
    if request.method == 'POST':
        prices = {}
        for ticker_id in request.data:
            ticker = get_object_or_404(Ticker, ticker_id=ticker_id)
            prices[ticker_id] = get_object_or_404(Price, ticker_id=ticker).current_price / 100.0
        return Response(prices)

    

@api_view(['GET','POST', 'PUT', 'DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def api_portfolio(request):
    auth_user = request.user
    if request.method == 'GET':
        username = request.GET.get('username', auth_user.username)
        user = get_object_or_404(User, username = username)
        holdings = Portfolio.objects.filter(user = user)
        if username == auth_user.username:
            serializer = PortfolioSerializer(holdings, many=True)
            return Response(serializer.data)
        else:
            serializer = TickerSerializer([x.ticker_id for x in holdings], many=True)
            return Response(serializer.data)
    elif request.method == 'POST':
        #TODO : make all save atomic
        for datum in request.data:
            serializer = PortfolioSerializer(data=datum)
            if serializer.is_valid():
                serializer.validated_data['user'] = auth_user
                # TODO enforce unique ticker per user
                serializer.save()
            else:
                print(serializer.errors)
                return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_201_CREATED)
    elif request.method == 'PUT':
        ticker_id = request.data['ticker_id']
        ticker = get_object_or_404(Ticker, ticker_id = ticker_id)
        portfolio = get_object_or_404(Portfolio, ticker_id=ticker, user=auth_user)
        serializer = PortfolioSerializer(portfolio, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        ticker_id = request.data['ticker_id']
        ticker = get_object_or_404(Ticker, ticker_id = ticker_id)
        portfolio = get_object_or_404(Portfolio, ticker_id=ticker, user=auth_user)
        portfolio.delete()
        return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def api_value(request):
    if request.method == 'GET':
        holdings = Portfolio.objects.filter(user = request.user)
        invested = 0
        current = 0
        for holding in holdings:
            if holding.units != None and holding.purchase_price != None:
                invested += holding.units * holding.purchase_price
                price = get_object_or_404(Price, ticker_id=holding.ticker_id).current_price / 100.0
                current += holding.units * price
            else:
                print("Null", holding)
        return Response({"invested" : invested, "current" : current})

    

@api_view(['GET','POST'])
@permission_classes((permissions.IsAuthenticated,))
def api_comments(request, slug):
    try:
        post = get_object_or_404(Post, slug=slug)
    except Http404:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['post'] = post
            for thisuser in UserProfile.objects.all():
                if thisuser.user.username == request.user.username:
                    serializer.validated_data['author'] = thisuser
                    break
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        data = post.comments.order_by('created_on')
        serializer = CommentSerializer(data, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def api_createpost(request):
    if request.method == 'POST':
        serializer = CreatePostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['author'] = request.user.profile.first()
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
    return Response(status=status.HTTP_400_BAD_REQUEST)
    

def content_library(request):
    content_list=[]
    for content in Learn.objects.all():
        content_list = content_list+[content]
    context = {'content_list':content_list}
    return render(request, 'busybeaver/learn.html', context)

def watchlist(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect('/busybeaver/login/')
    else:
        if request.method == 'GET':
            ticker = request.GET.get('add_ticker', '')
            if ticker is None:
                return HttpResponseRedirect('/busybeaver/companydetails')
            else:
                for ticker_object in Ticker.objects.all():
                    if ticker_object.ticker_id == ticker:
                        model_obj = Watchlist()
                        model_obj.ticker_id = ticker_object
                        model_obj.user = request.user
                        model_obj.save()
                        break
                return HttpResponseRedirect('/busybeaver/companydetails/' + ticker)

def portfolio(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect('/busybeaver/login/')
    else:
        holdings = []
        for company in Portfolio.objects.all():
            if request.user.username == company.user.username :
                holding = {}
                holding['company'] = company
                holding['price'] = (company.purchase_price)*(company.units)
                holdings.append(holding)
        context = {'holdings':holdings}
        return render (request, 'busybeaver/portfolio.html', context)
