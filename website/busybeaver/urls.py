from django.urls import include, path
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('', views.index, name='index'),
    path('feed/', views.universal_feed, name='feed'),
    path('feed/<str:ticker_id>/', views.universal_feed, name = 'ticker_feed'),
    path('profile/<str:userid>/', views.profile, name = 'profile_page'),
    path('createpost/', views.createpost, name = 'create_post'),
    path('postdetails/<slug:slug>/', views.post_detail, name = 'post_detail'),
    path('register/', views.register, name = 'register'),
    path('companydetails/', views.company_list, name = 'company_list'),
    path('companydetails/<str:ticker_id>/', views.company_details, name = 'company_page'),
    path('learn/', views.content_library, name='learn'),
    path('watchlist/', views.watchlist, name ='watchlist'),
    path('portfolio/', views.portfolio, name = 'portfolio')
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
