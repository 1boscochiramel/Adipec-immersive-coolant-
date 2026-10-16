"""The pure-Python correlations must reproduce DWSIM 9.0.5 PropertyMethods (values recorded on this grid)."""
import json
from pathlib import Path
import pytest
from immersion_screen import correlations as cr

GRID = json.loads((Path(__file__).parent / "data" / "dwsim_reference_grid.json").read_text())


@pytest.mark.parametrize("row", GRID, ids=lambda r: f"Tb{r['Tb']}-SG{r['SG']}")
def test_matches_dwsim(row):
    tb, sg = row["Tb"], row["SG"]
    assert cr.molecular_weight(tb, sg) == pytest.approx(row["MW"], rel=2e-5)
    assert cr.critical_temp(tb, sg) == pytest.approx(row["Tc"], rel=5e-5)
    assert cr.critical_press(tb, sg) == pytest.approx(row["Pc"], rel=1e-4)
    assert cr.acentric_factor(tb, row["Tc"], row["Pc"]) == pytest.approx(row["w"], rel=1e-9)
    v37, v98 = cr.kv_abbott(tb, sg)
    if row["v37"] > 0:
        assert v37 * 1e-6 == pytest.approx(row["v37"], rel=1e-9)
    if row["v98"] > 0:
        assert v98 * 1e-6 == pytest.approx(row["v98"], rel=1e-9)
