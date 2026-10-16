"""Cut model: calibration anchor, narrow-cut window and the light-tail-only trap."""
import pytest
from immersion_screen.cut import Cut, narrow_cut_curve, NBP_C
from immersion_screen import window

CRC2 = [(0.5, 337), (5, 346), (10, 351), (50, 377), (90, 402), (95, 407), (99.5, 415)]
WIDE2 = [(0.5, 300), (5, 325), (10, 338), (50, 377), (90, 410), (95, 418), (99.5, 430)]


def test_calibration_anchor_crc_2cst():
    assert Cut(CRC2, 0.836).mu(25) == pytest.approx(13.04, abs=0.05)


def test_target_c21_c25_meets_gates_with_margin():
    s = window.evaluate(21, 25)
    assert s["meets"] and s["margin"]
    assert s["mu25"] == pytest.approx(13.6, abs=0.1)
    assert s["fom1"] == pytest.approx(36.8, abs=0.1)
    assert s["flash_cc_cons"] == pytest.approx(163, abs=1)


def test_c22_c26_fails_viscosity():
    assert not window.evaluate(22, 26)["meets"]


def test_trimming_only_light_tail_raises_viscosity():
    base, trimmed = Cut(WIDE2, 0.836), Cut(WIDE2, 0.836, trim_below_C=NBP_C[21])
    assert trimmed.flash_cc()[1] > base.flash_cc()[1]
    assert trimmed.mu(25) > 15 > base.mu(25)
