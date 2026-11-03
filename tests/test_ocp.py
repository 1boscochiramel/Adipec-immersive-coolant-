"""Boundary checks for the strict dielectric-constant screening gate."""
from immersion_screen import ocp


def test_dielectric_constant_requires_strictly_below_gate():
    assert ocp.check('dk', 2.29) == 'pass'
    assert ocp.check('dk', 2.30) == 'fail'
    assert ocp.check('dk', 2.31) == 'fail'
    assert ocp.check('dk', None) == 'unknown'
