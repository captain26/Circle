from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('busybeaver/', include('busybeaver.urls')),
    path('admin/', admin.site.urls),
    path('busybeaver/', include('django.contrib.auth.urls'))
]
