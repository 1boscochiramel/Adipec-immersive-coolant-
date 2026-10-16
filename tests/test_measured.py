"""OCP figures of merit of measured CRC AVFL-37 base oils at 25 C (independently computed twice, 2026-10-16)."""
import pytest
from immersion_screen import measured

ROWS = {r["name"]: r for r in measured.load_crc()}


def test_group_iii_2cst():
    x = measured.screen(ROWS["Group III B 2 cSt (Yubase)"], 25)
    assert x["fom1"] == pytest.approx(37.2, abs=0.1)
    assert x["fom2"] == pytest.approx(28.8, abs=0.1)
    assert x["mu_mPas"] == pytest.approx(13.04, abs=0.05)


def test_4cst_fails_viscosity_and_tier1():
    x = measured.screen(ROWS["Group III B 4 cSt (Yubase)"], 25)
    assert x["mu_mPas"] > 15 and x["fom1"] < 35


def test_pao3_passes():
    x = measured.screen(ROWS["Group IV PAO 3 cSt"], 25)
    assert x["mu_mPas"] < 15 and x["fom1"] > 35
