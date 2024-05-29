FROM mcr.microsoft.com/dotnet/aspnet:7.0 as aspnet
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app/src
# COPY *.sln .
# COPY UniversitySolution.* .
# COPY "Console" .
WORKDIR /app/src
COPY . .
RUN dotnet restore ./UniversitySolution.Infrastructure.Api/UniversitySolution.Infrastructure.Api.csproj 
RUN dotnet build ./UniversitySolution.Infrastructure.Api/UniversitySolution.Infrastructure.Api.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish ./UniversitySolution.Infrastructure.Api/UniversitySolution.Infrastructure.Api.csproj -c Release -o /app/publish

# start env
FROM aspnet AS final
WORKDIR /app
ENV DOTNET_VERSION_COPY=9999
ENV POSTGRES_HOST=postgres
ENV POSTGRES_DB=university
ENV POSTGRES_USER=bekzatdamir
ENV POSTGRES_PASSWORD=bekzat20031006
ENV POSTGRES_PORT=5432
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "UniversitySolution.Infrastructure.Api.dll"]
