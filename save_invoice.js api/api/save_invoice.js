export default async function handler(req, res) {
    // CORS Setup: Yeh browser ko block karne se rokta hai (Bohot zaroori hai!)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Pre-flight request handle karna
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Sirf POST request accept karna
    if (req.method === 'POST') {
        try {
            const invoiceData = req.body;
            
            // Yeh data aapko Vercel ke "Logs" wale section mein dikhega
            console.log("🔥 Naya Invoice Data Aaya:", invoiceData);

            // Abhi ke liye hum bas success message bhej rahe hain
            return res.status(200).json({ 
                success: true, 
                message: "Swastik Server: Data successfully received!",
                data_received: invoiceData
            });

        } catch (error) {
            console.error("Error processing request:", error);
            return res.status(500).json({ error: "Server mein kuch gadbad ho gayi" });
        }
    } else {
        // Agar koi browser mein direct link kholne ki koshish kare
        return res.status(405).json({ error: "Bhai, sirf POST request allowed hai!" });
    }
}
