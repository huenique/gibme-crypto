from .views import AssetViewSet

routes = [
    {
        'regex': r'asset',
        'viewset': AssetViewSet,
        'basename': 'Asset'
    },
]
