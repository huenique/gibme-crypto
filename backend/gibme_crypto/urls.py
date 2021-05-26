from django.conf.urls import include
from django.urls import path
from django.contrib import admin

import django_js_reverse.views
from rest_framework.routers import DefaultRouter

from common.routes import routes as common_routes
from data.routes import routes as data_routes

router = DefaultRouter()

routes = common_routes
# data_routes = None

for route in routes:
    router.register(route['regex'],
                    route['viewset'],
                    basename=route['basename'])

for route in data_routes:
    router.register(route['regex'],
                    route['viewset'],
                    basename=route['basename'])

urlpatterns = [
    path("", include("common.urls"), name="common"),
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path("api/", include(router.urls), name="api"),
]
