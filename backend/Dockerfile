FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ViniloVibes.Api/ViniloVibes.Api.csproj ViniloVibes.Api/
RUN dotnet restore ViniloVibes.Api/ViniloVibes.Api.csproj

COPY ViniloVibes.Api/ ViniloVibes.Api/
RUN dotnet publish ViniloVibes.Api/ViniloVibes.Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "ViniloVibes.Api.dll"]