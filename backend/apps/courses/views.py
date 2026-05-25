from rest_framework import generics
from .models import Course,Lesson,LessonProgress
from .serializers import CourseSerializer, CourseDetailSerializer
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter]
    search_fields = ["title", "description"]

    def get_queryset(self):

        queryset = Course.objects.all().order_by("-created_at")

        limit = self.request.query_params.get("limit")

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