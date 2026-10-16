from django.db import models
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField
from wagtail.fields import RichTextField
from wagtail.models import Page


class ProjectIndexPage(Page):
    template = "projects/project_index_page.html"
    max_count = 1
    subpage_types = ["projects.ProjectPage"]
    parent_page_types = ["home.HomePage"]

    def get_context(self, request):
        context = super().get_context(request)
        context["projects"] = self.get_children().live().public().specific().order_by("-first_published_at")
        return context


class ProjectPage(Page):
    template = "projects/project_page.html"
    parent_page_types = ["projects.ProjectIndexPage"]
    subpage_types = []

    summary = models.CharField(max_length=255)
    challenge = RichTextField(blank=True)
    approach = RichTextField(blank=True)
    impact = RichTextField(blank=True)
    tools = models.CharField(max_length=255, blank=True)
    repo_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)

    api_fields = [
        APIField("summary"),
        APIField("challenge"),
        APIField("approach"),
        APIField("impact"),
        APIField("tools"),
        APIField("repo_url"),
        APIField("demo_url"),
    ]

    content_panels = Page.content_panels + [
        FieldPanel("summary"),
        FieldPanel("challenge"),
        FieldPanel("approach"),
        FieldPanel("impact"),
        FieldPanel("tools"),
        FieldPanel("repo_url"),
        FieldPanel("demo_url"),
    ]
