from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .client.utils import locals
from .models import Data


class AssetViewSet(viewsets.ViewSet):
    def _load_assets(self):
        dt = {}
        for asset in locals.MAIN_ASSETS:
            datum = Data.objects.filter(
                datum_name=f'{asset}.json').values('datum')
            dt[asset] = datum[0].get('datum')
        return dt

    @action(
        detail=False,
        methods=['get', 'post'],
        permission_classes=[AllowAny],
        url_path='assets',
    )
    def assets(self, request):
        return Response(
            self._load_assets(),
            status=status.HTTP_200_OK,
        )
