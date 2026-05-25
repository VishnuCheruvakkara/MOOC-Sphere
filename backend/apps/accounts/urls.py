from django.urls import path
from .views import SignupView,MeView,LogoutView,LoginView,RefreshTokenView

urlpatterns = [
    path("signup/",SignupView.as_view(),name="signup"),
    path("me/",MeView.as_view(),name="me"),
    path("logout/",LogoutView.as_view(),name="logout"),
    path("login/",LoginView.as_view(),name="login"),
    path("refresh/", RefreshTokenView.as_view(), name="token_refresh"),

]