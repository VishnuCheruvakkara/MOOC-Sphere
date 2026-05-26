from rest_framework import generics
from .models import Course,Lesson,LessonProgress,Enrollment
from .serializers import CourseSerializer, CourseDetailSerializer
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter]
    search_fields = ["title", "description"]

    def get_queryset(self):

        queryset = Course.objects.all().order_by("-created_at")

        limit = self.request.query_params.get("limit")
        my_course = self.request.query_params.get("my_course")

        if my_course == "true" and self.request.user.is_authenticated:
            queryset = queryset.filter(
                enrollments__user=self.request.user
            ).distinct()
            
        if limit:
            queryset = queryset[:int(limit)]

        return queryset


class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.prefetch_related("lessons")
    serializer_class = CourseDetailSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
    
class MarkLessonVisitedView(generics.CreateAPIView):

    def post(self, request, lesson_id):
        lesson = Lesson.objects.get(id=lesson_id)

        LessonProgress.objects.get_or_create(
            user=request.user,
            lesson=lesson
        )

        return Response({"message": "visited"})
    
class EnrollCourseView(generics.GenericAPIView):

    def post(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)

        enrollment, created = Enrollment.objects.get_or_create(
            user=request.user,
            course=course
        )

        return Response({
            "message": "enrolled",
            "created": created
        })