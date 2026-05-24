from django.urls import path
from .views import SignupView,MeView,LogoutView

urlpatterns = [
    path("signup/",SignupView.as_view(),name="signup"),
    path("me/",MeView.as_view(),name="me"),
    path("logout/",LogoutView.as_view(),name="logout")

]