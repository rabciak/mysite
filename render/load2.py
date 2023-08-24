from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from .models import NuclearReactor

nuclear_mapping = {
    "source": "source",
    "name_en": "name_en",
    "outp_mw": "outp_mw",
    "mpoly": "Point"
}

nuclear_shp = Path(__file__).resolve().parent / "data" / "nuclear_plants.shp"


def run(verbose=True):
    lm = LayerMapping(NuclearReactor, nuclear_shp, nuclear_mapping, transform=False, encoding="UTF-8")
    lm.save(strict=True, verbose=verbose)