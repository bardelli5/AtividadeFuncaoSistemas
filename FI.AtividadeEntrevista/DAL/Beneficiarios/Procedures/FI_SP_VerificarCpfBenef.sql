CREATE PROC FI_SP_VerificarCpfBenef
    @Cpf VARCHAR(11),
    @IdBenef BIGINT
AS
BEGIN
    SELECT *
    FROM BENEFICIARIOS
    WHERE CPF = @Cpf
    AND ID <> @IdBenef
END