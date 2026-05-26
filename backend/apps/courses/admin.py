from django.contrib import admin

from .models import Course, Lesson, Enrollment, LessonProgress


class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 0
    fields = ("title", "created_at")
    readonly_fields = ("created_at",)


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at")
    search_fields = ("title",)
    list_filter = ("created_at",)
    inlines = (LessonInline,)


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("title", "course", "created_at")
    list_filter = ("course",)
    search_fields = ("title", "course__title")
    ordering = ("course", "created_at")


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ("user", "course", "enrolled_at")
    list_filter = ("course", "enrolled_at")
    search_fields = ("user__email", "course__title")


@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ("user", "lesson", "visited_at")
    list_filter = ("visited_at",)
    search_fields = ("user__email", "lesson__title")