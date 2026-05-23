from django.urls import path
from .views import loginView

urlpatters = [
    path("login/",LoginView.as_view(),name="login"),

]