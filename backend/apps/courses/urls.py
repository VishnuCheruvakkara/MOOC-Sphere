from django.urls import path
from .views import CourseDetailView,CourseListView,MarkLessonVisitedView

urlpatterns = [
    path("all-courses/", CourseListView.as_view(),name="all-courses"),
    path("all-courses/<int:pk>/", CourseDetailView.as_view(),name="get-each-course"),
    path("lessons/<int:lesson_id>/visit/", MarkLessonVisitedView.as_view(),name="mark-lesson"),
]
