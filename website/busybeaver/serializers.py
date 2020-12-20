from rest_framework import serializers
from .models import Post, Comment, Company, Ticker

class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields =  ('title', 'author', 'key_insight_1', 'key_insight_2', 'key_insight_3', 'content', 'pub_date', 'tag', 'slug', 'sentiment')


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


  
