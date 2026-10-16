from django.db import models
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField
from wagtail.fields import RichTextField
from wagtail.models import Page


class HomePage(Page):
    max_count = 1
    template = "home/home_page.html"

    intro = RichTextField(blank=True)
    about = RichTextField(blank=True)

    api_fields = [
        APIField("intro"),
        APIField("about"),
    ]

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("about"),
    ]

    subpage_types = ["projects.ProjectIndexPage", "blog.BlogIndexPage"]

    def get_context(self, request):
        context = super().get_context(request)
        from blog.models import BlogPage
        from projects.models import ProjectPage

        context["latest_blog_posts"] = BlogPage.objects.live().public().order_by("-first_published_at")[:3]
        context["featured_projects"] = ProjectPage.objects.live().public().order_by("-first_published_at")[:3]
        return context
