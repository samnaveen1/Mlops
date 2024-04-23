from django.urls import path
from app_name import views

urlpatterns = [
    path('', views.home, name='home'),  # URL pattern for the root URL
    path('predict/', views.predict, name='predict'),  # URL pattern for the predict view
]
