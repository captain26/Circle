from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static

urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
    path('busybeaver/', include('busybeaver.urls')),
    path('admin/', admin.site.urls),
    path('busybeaver/', include('django.contrib.auth.urls'))
]
