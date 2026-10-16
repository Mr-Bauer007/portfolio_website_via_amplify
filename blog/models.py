from django.db import models
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField
from wagtail.fields import RichTextField
from wagtail.models import Page


class BlogIndexPage(Page):
    template = "blog/blog_index_page.html"
    max_count = 1
    subpage_types = ["blog.BlogPage"]
    parent_page_types = ["home.HomePage"]

    def get_context(self, request):
        context = super().get_context(request)
        context["posts"] = self.get_children().live().public().specific().order_by("-first_published_at")
        return context


class BlogPage(Page):
    template = "blog/blog_page.html"
    parent_page_types = ["blog.BlogIndexPage"]
    subpage_types = []

    summary = models.CharField(max_length=255)
    topic = models.CharField(max_length=100, blank=True)
    reading_time_minutes = models.PositiveIntegerField(default=5)
    published_date = models.DateField()
    body = RichTextField(blank=True)

    api_fields = [
        APIField("summary"),
        APIField("topic"),
        APIField("reading_time_minutes"),
        APIField("published_date"),
        APIField("body"),
    ]

    content_panels = Page.content_panels + [
        FieldPanel("summary"),
        FieldPanel("topic"),
        FieldPanel("reading_time_minutes"),
        FieldPanel("published_date"),
        FieldPanel("body"),
    ]
