"""Thin pythonnet wrapper around DWSIM 9.0.5 petroleum-characterisation methods."""
import os, sys, io, contextlib
DW = os.environ.get("DWSIM_DIR", os.path.join(os.environ.get("LOCALAPPDATA", ""), "DWSIM"))   # DWSIM 9.0.5 folder
_cwd = os.getcwd(); os.chdir(DW); sys.path.append(DW)
import clr
clr.AddReference(os.path.join(DW, "DWSIM.Thermodynamics.dll"))
from DWSIM.Thermodynamics.Utilities.PetroleumCharacterization.Methods import PropertyMethods as PM, DistillationCurveConversion as DC
from System import Array, Double
os.chdir(_cwd)

def simdis_to_tbp(temps_C):
    """ASTM D2887 (5,10,30,50,70,90,95 %) in C -> TBP in C (Daubert, API TDB)."""
    arr = Array[Double]([t + 273.15 for t in temps_C])
    return [x - 273.15 for x in DC.ASTMD2887ToPEV_Daubert(arr)]

def pseudo(Tb_K, sg):
    mw = PM.MW_Riazi(Tb_K, sg); tc = PM.Tc_RiaziDaubert(Tb_K, sg); pc = PM.Pc_RiaziDaubert(Tb_K, sg)
    return dict(Tb=Tb_K, sg=sg, mw=mw, tc=tc, pc=pc, w=PM.AcentricFactor_LeeKesler(tc, pc, Tb_K),
                v37=PM.Visc37_Abbott(Tb_K, sg), v98=PM.Visc98_Abbott(Tb_K, sg))
