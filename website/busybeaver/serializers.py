from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Post, Comment, Company, Ticker, UserProfile, Note, Reaction, Portfolio, Connection, Watchlist, StockDetails

User._meta.get_field('email')._unique = True

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
      
class UserProfileSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  class Meta:
    model = UserProfile
    fields = ('name', 'user', 'image', 'bio')

class NoteSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  tag = serializers.SlugRelatedField(
    many=True,
    slug_field='ticker_id',
    queryset=Ticker.objects.all()
  )
  class Meta:
    model = Note
    fields =  ('title', 'user', 'content', 'pub_date', 'tag', 'slug')

class CreateNoteSerializer(serializers.ModelSerializer):
  tag = serializers.SlugRelatedField(
    many=True,
    slug_field='ticker_id',
    queryset=Ticker.objects.all()
  )
  class Meta:
    model = Note
    fields =  ('title', 'content', 'pub_date', 'tag')

    
    
class PostSerializer(serializers.ModelSerializer):
  author = UserProfileSerializer(read_only=True)
  tag = serializers.SlugRelatedField(
    many=True,
    slug_field='ticker_id',
    queryset=Ticker.objects.all()
  )

  reactions = serializers.SerializerMethodField()

  def get_reactions(self, obj):
      queryset = [x.user for x in obj.reactions.all()]
      return UserSerializer(queryset, many=True).data

  class Meta:
    model = Post
    fields =  ('title', 'author', 'content', 'pub_date', 'tag', 'slug', 'sentiment', 'reactions')

class CreatePostSerializer(serializers.ModelSerializer):
  tag = serializers.SlugRelatedField(
    many=True,
    slug_field='ticker_id',
    queryset=Ticker.objects.all()
  )
  class Meta:
    model = Post
    fields =  ('title', 'content', 'pub_date', 'tag', 'sentiment')

class ReactionSerializer(serializers.ModelSerializer):
    post = PostSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    class Meta:
        model = Reaction
        fields = ('post', 'user', 'reaction_type')


class CommentSerializer(serializers.ModelSerializer):
  author = UserProfileSerializer(read_only=True)
  class Meta:
    model = Comment
    fields = ('body', 'author', 'created_on')

    
class CompanySerializer(serializers.ModelSerializer):
  class Meta:
    model = Company
    fields = ('ticker_id', 'name', 'ceo', 'about')

class StockDetailsSerializer(serializers.ModelSerializer):
  class Meta:
    model = StockDetails
    fields = ('ticker_id', 'market_cap',  'pe',  'book_value',  'dividend',  'industry_pe',  'eps',  'price_to_book',  'dividend_yield',  'face_value')

    
class TickerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Ticker
    fields = ('ticker_id',)

class PortfolioSerializer(serializers.ModelSerializer):
  ticker_id = serializers.SlugRelatedField(
        many=False,
        slug_field='ticker_id',
        queryset=Ticker.objects.all()
  )
  user = UserSerializer(read_only=True)
  class Meta:
    model = Portfolio
    fields =  ('ticker_id', 'units', 'purchase_price', 'user')

class WatchlistSerializer(serializers.ModelSerializer):
  ticker_id = serializers.SlugRelatedField(
        many=False,
        slug_field='ticker_id',
        queryset=Ticker.objects.all()
  )
  user = UserSerializer(read_only=True)
  class Meta:
    model = Watchlist
    fields =  ('ticker_id', 'user')

    
class ConnectionSerializer(serializers.ModelSerializer):
    user_id = serializers.SlugRelatedField(
        many=False,
        slug_field='username',
        queryset=User.objects.all()
  )
    following_user_id = UserSerializer(read_only=True)
    class Meta:
        model = Connection
        fields = ('user_id', 'following_user_id')
