Set sapi = CreateObject("SAPI.SpVoice")
Set cat  = CreateObject("SAPI.SpObjectTokenCategory")
cat.SetID "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech_OneCore\Voices", False
For Each token In cat.EnumerateTokens
    If token.GetAttribute("Name") = "Microsoft Sayaka" Then
        Set oldv = sapi.Voice
        Set sapi.Voice = token
        sapi.Speak "�����n�O�����u�l���L�q�v���L���ȕl���s�́A���N1�N�Ԃ�1���ѓ�����̃M���[�U�̍w���z��3766�~�ƂȂ�A���C�o���̉F�s�{�s��73�~������2�N�Ԃ�ɓ��{��̍���D�҂��܂����B"
        Set sapi.Voice = oldv
        Exit For
    End If
Next
