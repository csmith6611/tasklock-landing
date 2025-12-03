interface Env {
  FORMSPREE_URL: string;
}

interface RequestBody {
  email: string;
  honeypot?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: RequestBody = await request.json();

    // Honeypot check - if filled, it's likely a bot
    if (body.honeypot) {
      // Pretend success to confuse bots
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate email
    const email = body.email?.trim().toLowerCase();
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Forward to Formspree
    const formspreeUrl = env.FORMSPREE_URL;
    if (!formspreeUrl) {
      console.error("FORMSPREE_URL not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get origin from request for Formspree's spam detection
    const origin = request.headers.get("Origin") || request.headers.get("Referer") || "https://tasklock.app";

    const formspreeResponse = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: origin,
      },
      body: JSON.stringify({ 
        email,
        _subject: "New TaskLock Early Access Signup",
      }),
    });

    if (!formspreeResponse.ok) {
      throw new Error(`Formspree error: ${formspreeResponse.status}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

