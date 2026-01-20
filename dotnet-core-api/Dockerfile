# Stage 1: Build and publish the application
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy project files and restore dependencies
# This is done separately to leverage Docker layer caching
COPY ["src/CleanArch.Api/CleanArch.Api.csproj", "src/CleanArch.Api/"]
COPY ["src/CleanArch.Application/CleanArch.Application.csproj", "src/CleanArch.Application/"]
COPY ["src/CleanArch.Domain/CleanArch.Domain.csproj", "src/CleanArch.Domain/"]
COPY ["src/CleanArch.Infrastructure/CleanArch.Infrastructure.csproj", "src/CleanArch.Infrastructure/"]

RUN dotnet restore "src/CleanArch.Api/CleanArch.Api.csproj"

# Copy the rest of the source code and build
COPY . .
WORKDIR "/src/src/CleanArch.Api"
RUN dotnet build "CleanArch.Api.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "CleanArch.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Expose port as requested
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "CleanArch.Api.dll"]
