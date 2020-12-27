from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Post, Comment, Company, Ticker, UserProfile

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
    fields = ('name', 'user')
      
class PostSerializer(serializers.ModelSerializer):
  author = UserProfileSerializer(read_only=True)
  class Meta:
    model = Post
    fields =  ('title', 'author', 'key_insight_1', 'key_insight_2', 'key_insight_3', 'content', 'pub_date', 'tag', 'slug', 'sentiment')

class CreatePostSerializer(serializers.ModelSerializer):
  tag = serializers.SlugRelatedField(
    many=True,
    slug_field='ticker_id',
    queryset=Ticker.objects.all()
  )
  class Meta:
    model = Post
    fields =  ('title', 'content', 'pub_date', 'tag', 'sentiment')


class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = ('body',)

class CompanySerializer(serializers.ModelSerializer):
  class Meta:
    model = Company
    fields = ('ticker_id', 'name', 'ceo', 'about')

class TickerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Ticker
    fields = ('ticker_id',)
