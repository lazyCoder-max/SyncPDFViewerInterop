using SyncPDFViewerInterop.Interfaces;

namespace SyncPDFViewerInterop
{
    public static class PDFViewerInteropServiceCollectionExtensions
    {
        public static IServiceCollection AddWalletConnectModalComponents(this IServiceCollection services)
        {
            services.AddScoped<IPDFViewerInterop, PDFViewerInterop>();

            return services;
        }
    }
}
