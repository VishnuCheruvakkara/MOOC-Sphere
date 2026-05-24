from django.urls import path
from .views import AllCourses

urlpatterns = [
    path("all-courses/",AllCourses.as_view(),name="all-courses"),

]