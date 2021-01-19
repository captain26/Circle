from django.http import HttpResponse
import datetime
from .models import Post, User, Comment, Company, UserProfile, Learn, Watchlist, Ticker, Portfolio
from django.shortcuts import render,get_object_or_404
from .forms import CommentForm, UserRegistrationForm, PostForm, PostForm_new
from django.views import generic
from django.contrib.auth import authenticate, login
import json
from django.contrib.auth.decorators import login_required
from django.utils.safestring import mark_safe
from django.http import HttpResponseRedirect
from django import forms
from django.http import JsonResponse
from rest_framework.response import Response 
from . serializers import PostSerializer, CreatePostSerializer, CommentSerializer, CompanySerializer, TickerSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import Http404
from rest_framework import generics, permissions
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


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

    
@api_view(['GET'])
def api_companies(request):
    companies = Company.objects.all()
    serializer = CompanySerializer(companies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def api_tickers(request):
    tickers = Ticker.objects.all()
    serializer = TickerSerializer(tickers, many=True)
    return Response(serializer.data)

def chat(request):
    return render(request, 'chat/index.html')

@login_required
def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name)),
        'username': mark_safe(json.dumps(request.user.username)),
    })

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
                # TODO: graceful redirection in error cases
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
                #TODO: graceful redirection in error cases
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
@api_view(['GET'])
def api_post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug)
    serializer = PostSerializer(post)
    return Response(serializer.data)


@api_view(['GET','POST'])
def api_comments(request, slug):
    try:
        post = get_object_or_404(Post, slug=slug)
    except Http404:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['post'] = post
            #disable authentication, always save as the first user TODO
            for thisuser in UserProfile.objects.all():
                serializer.validated_data['author'] = thisuser
                break
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        data = post.comments
        serializer = CommentSerializer(data, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def api_createpost(request):
    if request.method == 'POST':
        serializer = CreatePostSerializer(data=request.data)
        if serializer.is_valid():
            #disable authentication, always save as the first user TODO
            for thisuser in UserProfile.objects.all():
                serializer.validated_data['author'] = thisuser
                break
            serializer.validated_data['slug'] = serializer.validated_data['title'].replace(' ', '-')
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
