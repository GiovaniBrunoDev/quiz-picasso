import nodemailer from "nodemailer";

export async function POST(req: Request) {

    const data = await req.json();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "giovanebruno100@gmail.com",
            pass: "pcit vjys cssy zhfy"
        }
    });

    const html = `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:20px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial;line-height:1.5;">

<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,0.08);">

<!-- HEADER -->
<tr>
<td style="background:#111;padding:25px;text-align:center;color:white">

<h1 style="margin:0;font-size:24px;font-weight:600;line-height:1.2;">
⭐ Nova avaliação recebida
</h1>

<p style="margin:6px 0 0;color:#bbb;font-size:12px;line-height:1.3;">
Picasso Resturante • Feedback de clientes
</p>

</td>
</tr>

<!-- CLIENT INFO -->
<tr>
<td style="padding:25px 20px;">

<table width="100%" cellpadding="5" cellspacing="0" style="font-size:14px;line-height:1.4;">

<tr>
<td style="color:#888;width:180px">Cliente</td>
<td style="font-weight:600;color:#111">${data.nome || "Não informado"}</td>
</tr>

<tr>
<td style="color:#888">Data da visita</td>
<td style="font-weight:600;color:#111">${data.data_visita || "Não informado"}</td>
</tr>

<tr>
<td style="color:#888">Conheceu por</td>
<td>${data.origem_cliente || "Não informado"}</td>
</tr>

<tr>
<td style="color:#888">Frequência</td>
<td>${data.frequencia || "Não informado"}</td>
</tr>

<tr>
<td style="color:#888">Expectativa</td>
<td>${data.expectativa || "Não informado"}</td>
</tr>

<tr>
<td style="color:#888">Saída mensal</td>
<td>${data.saida_mensal || "Não informado"}</td>
</tr>

</table>

</td>
</tr>

<!-- SCORE -->
<tr>
<td style="padding:15px 20px">

<div style="
background:#fafafa;
border-radius:12px;
padding:20px;
text-align:center;
border:1px solid #eee;
">

<p style="margin:0;color:#777;font-size:12px;">Avaliação da experiência</p>

<p style="margin:8px 0 0;font-size:36px;font-weight:700;color:#111;letter-spacing:-0.5px;">
${data.avaliacao}
</p>


</div>

</td>
</tr>

<!-- POSITIVOS -->
<tr>
<td style="padding:10px 20px">

<h3 style="font-size:15px;margin-bottom:8px">👍 O que o cliente gostou</h3>

<div style="
background:#f9fafb;
padding:15px;
border-radius:10px;
border:1px solid #eee;
color:#444;
line-height:1.5;
">
${data.positivos || "—"}
</div>

</td>
</tr>

<!-- MELHORIAS -->
<tr>
<td style="padding:10px 20px 20px 20px">

<h3 style="font-size:15px;margin-bottom:8px">⚠️ O que pode melhorar</h3>

<div style="
background:#f9fafb;
padding:15px;
border-radius:10px;
border:1px solid #eee;
color:#444;
line-height:1.5;
">
${data.melhorias || "—"}
</div>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="padding:15px 20px;text-align:center;font-size:11px;color:#999;border-top:1px solid #eee;line-height:1.4;">
Sistema automático de feedback<br>
Picasso Restaurante • © 2026
</td>
</tr>

</table>

</td>
</tr>

</table>
`;

    await transporter.sendMail({
        from: "Avaliações Picasso <giovanebruno100@gmail.com>",
        to: "calcisshoes@gmail.com",
        subject: "⭐ Nova avaliação recebida",
        html: html
    });

    return Response.json({ ok: true });

}