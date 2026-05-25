from django.urls import path
from .views import CourseDetailView,CourseListView

urlpatterns = [
    path("all-courses/", CourseListView.as_view()),
    path("all-courses/<int:pk>/", CourseDetailView.as_view()),
]