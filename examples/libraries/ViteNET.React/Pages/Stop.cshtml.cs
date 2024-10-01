using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ViteNET.React.Pages
{
    public class StopModel : PageModel
    {
        public IActionResult OnGet()
        {
            // This will end the pipeline
            return Content("Hello from Razor Page!");
        }
    }
}
