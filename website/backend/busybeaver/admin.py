from django.contrib import admin

from .models import Ticker, Company, Price, Post, UserProfile, Connection, Comment, Learn, Watchlist, Portfolio, StockDetails, News

admin.site.register(Ticker)
admin.site.register(Company)
admin.site.register(Price)
admin.site.register(Post)
admin.site.register(UserProfile)
admin.site.register(Connection)
admin.site.register(Learn)
admin.site.register(Watchlist)
admin.site.register(Portfolio)
admin.site.register(StockDetails)
admin.site.register(News)
admin.site.register(Comment)
#@admin.register(Comment)


# Register your models here.
