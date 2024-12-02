BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [userName] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [refreshToken] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Role] (
    [id] INT NOT NULL IDENTITY(1,1),
    [roleName] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Role_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Role_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Role_roleName_key] UNIQUE NONCLUSTERED ([roleName])
);

-- CreateTable
CREATE TABLE [dbo].[_UserRoles] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_UserRoles_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_UserRoles_B_index] ON [dbo].[_UserRoles]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[_UserRoles] ADD CONSTRAINT [_UserRoles_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Role]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_UserRoles] ADD CONSTRAINT [_UserRoles_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
