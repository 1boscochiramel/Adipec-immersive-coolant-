"""Closed-cup flash model against pure compounds (database flash points, critical constants from the
`chemicals` library: hexadecane and squalane)."""
import pytest
from immersion_screen.correlations import flash_point_cc

HEXADECANE = dict(Tc=722.1, Pc=1479850.0, w=0.749, mw=226.44116)     # flash 126.6 C
SQUALANE = dict(Tc=796.0, Pc=600000.0, w=1.2135, mw=422.81328)       # flash 209.7 C


def test_hexadecane():
    assert flash_point_cc([HEXADECANE], [1.0]) == pytest.approx(126.6, abs=4.0)


def test_squalane():
    assert flash_point_cc([SQUALANE], [1.0]) == pytest.approx(209.7, abs=10.0)


def test_mixture_between_components():
    t = flash_point_cc([HEXADECANE, SQUALANE], [0.5, 0.5])
    assert 126 < t < 210
