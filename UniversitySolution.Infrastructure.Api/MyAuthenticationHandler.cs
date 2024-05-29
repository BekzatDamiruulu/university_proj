// using System.Security.Claims;
// using System.Text.Encodings.Web;
// using Microsoft.AspNetCore.Authentication;
// using Microsoft.Extensions.Options;
//
// namespace UniversitySolution.Api;
//
// public class MyAuthenticationHandler:AuthenticationHandler<AuthenticationSchemeOptions>
// {
//     public MyAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock) : base(options, logger, encoder, clock)
//     {
//     }
//
//     protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
//     {
//         var bodyStream = Context.Request.Body;
//         var random = new Random();
//         // if (random.Next(0, 2) == 0)
//         // {
//             var claimsPrinc = new ClaimsPrincipal();
//             var claim = new Claim[]
//             {
//                 new Claim(ClaimTypes.Name,"Bekzat Damir uulu")
//             };
//             claimsPrinc.AddIdentity(new ClaimsIdentity(claim));
//             Context.User = claimsPrinc;
//             
//            return AuthenticateResult.Success(new AuthenticationTicket(claimsPrinc,"default"));
//         // }
//         return  AuthenticateResult.Fail(new Exception("fail"));
//     }
// }