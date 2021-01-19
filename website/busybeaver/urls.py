from django.urls import include, path
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static
from knox import views as knox_views
from . import views

urlpatterns = [
    path('chat', views.chat, name='chat'),
    path('chat/<str:room_name>/', views.room, name='room'), 
    path('api/auth', include('knox.urls')),
    path('api/auth/register', views.RegisterAPIView.as_view()),
    path('api/auth/login', views.LoginAPIView.as_view()),
    path('api/auth/user', views.UserAPIView.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/companies/', views.api_companies, name = 'api_companies'),
    path('api/tickers/', views.api_tickers, name = 'api_tickers'),
    path('home/', views.home, name='home'),
    path('', views.index, name='index'),
    path('feed/', views.universal_feed, name='feed'),
    path('feed/<str:ticker_id>/', views.universal_feed, name = 'ticker_feed'),
    path('api/feed/', views.api_universal_feed, name='api_feed'),
    path('api/feed/<str:ticker_id>/', views.api_universal_feed, name = 'api_ticker_feed'),
    path('api/comments/<slug:slug>/', views.api_comments, name = 'api_comments'),
    path('profile/<str:userid>/', views.profile, name = 'profile_page'),
    path('createpost/', views.createpost, name = 'create_post'),
    path('api/createpost/', views.api_createpost, name = 'api_create_post'),
    path('postdetails/<slug:slug>/', views.post_detail, name = 'post_detail'),
    path('api/postdetails/<slug:slug>/', views.api_post_detail, name = 'api_post_detail'),
    path('register/', views.register, name = 'register'),
    path('companydetails/', views.company_list, name = 'company_list'),
    path('companydetails/<str:ticker_id>/', views.company_details, name = 'company_page'),
    path('learn/', views.content_library, name='learn'),
    path('watchlist/', views.watchlist, name ='watchlist'),
    path('portfolio/', views.portfolio, name = 'portfolio'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
