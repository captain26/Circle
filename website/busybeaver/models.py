from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
import uuid
from django.template.defaultfilters import slugify
from django.core.exceptions import ValidationError

def validate_message_content(content):
    if content is None or content == "" or content.isspace():
        raise ValidationError(
            'Content is empty/invalid',
            code='invalid',
            params={'content': content},
        )


class Message(models.Model):

    id = models.UUIDField(
        primary_key=True,
        null=False,
        default=uuid.uuid4,
        editable=False
    )
    author = models.ForeignKey(
        User,
        blank=False,
        null=False,
        related_name='author_messages',
        on_delete=models.CASCADE
    )
    content = models.TextField(validators=[validate_message_content])
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    chat_id = models.CharField(max_length=70, null=True)

    def last_50_messages(chat_id):
        return Message.objects.filter(chat_id=chat_id).order_by('-created_at').all()[:50]

class Ticker(models.Model):
    ticker_id = models.CharField(max_length=20)

    def __str__(self):
        return self.ticker_id

#price is in paise
class Price (models.Model):
    ticker_id = models.ForeignKey(Ticker, on_delete=models.CASCADE)
    current_price = models.IntegerField(null=True)
    last_updated = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return (str(self.current_price) + '@' + self.ticker_id.ticker_id)


class Company (models.Model):
    ticker_id = models.ForeignKey(Ticker, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    ceo = models.CharField(max_length=30)
    about = models.TextField()
    def __str__(self):
        return self.name

class UserProfile(models.Model):
    name = models.CharField(max_length=30)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="profile")
    image = models.ImageField(upload_to='media/profile-pictures', blank=True)
    bio = models.TextField(blank=True)
    def __str__(self):
        return self.name

class Connection(models.Model):
    user_id = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)
    following_user_id = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

class Post(models.Model):
    class Sentiment(models.IntegerChoices):
        VERYBULLISH = 2, _('Very Bullish')
        BULLISH = 1, _('Bullish')
        NEUTRAL = 0, _('Neutral')
        BEARISH = -1, _('Bearish')
        VERYBEARISH = -2, _('Very Bearish')

    title = models.CharField(max_length=200, unique=False)
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    content = models.TextField(blank=True)
    pub_date = models.DateTimeField(auto_now_add=True)
    tag = models.ManyToManyField('Ticker', blank=True)
    slug = models.SlugField(max_length=200, unique=False)
    sentiment = models.IntegerField(choices=Sentiment.choices)
    def __str__(self):
        return self.title

    def save(self, **kwargs):
        if not self.slug:
            slug = slugify(self.title)
            duplications = Post.objects.filter(slug=slug)
            if duplications.exists():
                self.slug = "%s-%s" % (slug[:168], uuid.uuid4().hex)
            else:
                self.slug = slug
        return super(Post, self).save(**kwargs)

class Reaction(models.Model):
    class Type(models.IntegerChoices):
        LIKE = 0, _('Like')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='reactions')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activity')
    reaction_type = models.IntegerField(choices=Type.choices)

class Note(models.Model):
    title = models.CharField(max_length=200, unique=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True)
    pub_date = models.DateTimeField(auto_now_add=True)
    tag = models.ManyToManyField('Ticker')
    slug = models.SlugField(max_length=200, unique=False)
    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    class Meta:
        ordering = ['created_on']

    def __str__(self):
        return ' {} : {}'.format(self.author.name, self.body)

class Learn(models.Model):
    main_speaker = models.CharField(max_length=40)
    title = models.CharField(max_length=100)
    video_url = models.URLField(max_length=200)
    summary = models.TextField(blank=True)

    def __str__(self):
        return (self.title + 'by' + self.main_speaker)

#price, book value, eps and face value are in paise    
class StockDetails(models.Model):
    ticker_id = models.ForeignKey(Ticker, on_delete=models.CASCADE)
    market_cap = models.IntegerField(null=True) # in lakhs
    pe = models.FloatField(null=True)
    book_value = models.IntegerField(null=True)
    dividend = models.FloatField(null=True)
    industry_pe = models.FloatField(null=True)
    eps = models.IntegerField(null=True)
    price_to_book= models.FloatField(null=True)
    dividend_yield = models.FloatField(null=True)
    face_value = models.IntegerField(null=True)
    # following are technicals, we only want valuations in this model
    #volume = models.IntegerField(null=True)
    #open_price = models.IntegerField(null=True)
    #close_price = models.IntegerField(null=True)

    def __str__(self):
        return self.ticker_id.ticker_id + str(self.market_cap)

class Watchlist(models.Model):
    user = models.ForeignKey(User, related_name='watchlist', on_delete=models.CASCADE)
    ticker_id = models.ForeignKey(Ticker, related_name='watchers', on_delete=models.CASCADE)

class Portfolio(models.Model):
    ticker_id = models.ForeignKey(Ticker, on_delete=models.CASCADE)
    units = models.IntegerField(blank=True, null=True)
    purchase_price = models.IntegerField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class News(models.Model):
    news_title = models.CharField(max_length=80)
    news_source = models.CharField(max_length=50)
    news_url = models.URLField(max_length=250)
    tags = models.ManyToManyField('Ticker')
    company_name = models.ManyToManyField('Company')
