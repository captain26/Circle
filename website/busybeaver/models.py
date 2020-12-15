from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

# Create your models here.
class Ticker(models.Model):
    ticker_id = models.CharField(max_length=20)

    def __str__(self):
        return self.ticker_id

#price is in paise
class Price (models.Model):
    ticker_id = models.ForeignKey(Ticker, on_delete=models.CASCADE)
    current_price = models.IntegerField(null=True)
    today_high = models.IntegerField(null=True)
    today_low = models.IntegerField(null=True)
    fiftytwo_week_high = models.IntegerField(null=True)
    fiftytwo_weeek_low = models.IntegerField(null=True)
    last_updated = models.DateTimeField ()
    def __str__(self):
        return (self.ticker_id + '@')


class Company (models.Model):
    ticker_id = models.ForeignKey(Ticker, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    ceo = models.CharField(max_length=30)
    about = models.TextField()
    def __str__(self):
        return self.name

class UserProfile(models.Model):
    name = models.CharField(max_length=30)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='busybeaver/static/profile-pictures', blank=True)
    def __str__(self):
        return self.name

class Connection(models.Model):
    user_id = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    following_user_id = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

class Post (models.Model):
    class Sentiment(models.IntegerChoices):
        VERYBULLISH = 2, _('Very Bullish')
        BULLISH = 1, _('Bullish')
        NEUTRAL = 0, _('Neutral')
        BEARISH = -1, _('Bearish')
        VERYBEARISH = -2, _('Very Bearish')

    title = models.CharField(max_length=200, unique=False)
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    key_insight_1 = models.CharField(max_length=200)
    key_insight_2 = models.CharField(max_length=200,blank=True)
    key_insight_3 = models.CharField(max_length=200,blank=True)
    content = models.TextField(blank=True)
    pub_date = models.DateTimeField(default='')
    tag = models.ManyToManyField('Ticker')
    slug = models.SlugField(max_length=200, unique=False)
    sentiment = models.IntegerField(choices=Sentiment.choices)
    def __str__(self):
        return self.content[0:20]

    #def get_absolute_url(self):
        #return reverse('post_detail', args=[str(self.id)])

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    class Meta:
        ordering = ['created_on']

    def __str__(self):
        return 'Comment {} by {}'.format(self.body, self.name)

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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ticker_id = models.ForeignKey(Ticker, on_delete=models.CASCADE)

class Portfolio(models.Model):
    ticker_id = models.ForeignKey(Ticker, on_delete=models.CASCADE)
    units = models.IntegerField(blank=True)
    purchase_price = models.IntegerField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class News(models.Model):
    news_title = models.CharField(max_length=80)
    news_source = models.CharField(max_length=50)
    news_url = models.URLField(max_length=250)
    tags = models.ManyToManyField('Ticker')
    company_name = models.ManyToManyField('Company')
