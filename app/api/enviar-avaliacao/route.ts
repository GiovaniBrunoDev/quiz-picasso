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
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial">

<tr>
<td align="center">

<table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.08)">

<!-- HEADER -->
<tr>
<td style="background:#111;padding:35px;text-align:center;color:white">

<h1 style="margin:0;font-size:28px;font-weight:600">
 ⭐ Nova avaliação recebida
</h1>

<p style="margin:8px 0 0;color:#bbb;font-size:13px">
Picasso Bar • Feedback de clientes
</p>

</td>
</tr>

<!-- CLIENT INFO -->
<tr>
<td style="padding:35px">

<table width="100%" cellpadding="10" cellspacing="0" style="font-size:15px">

<tr>
<td style="color:#888;width:200px">Cliente</td>
<td style="font-weight:600;color:#111">
${data.nome || "Não informado"}
</td>
</tr>

<tr>
<td style="color:#888">Data da visita</td>
<td style="font-weight:600;color:#111">
${data.data_visita || "Não informado"}
</td>
</tr>

<tr>
<td style="color:#888">Conheceu por</td>
<td>${data.origem_cliente}</td>
</tr>

<tr>
<td style="color:#888">Frequência</td>
<td>${data.frequencia}</td>
</tr>

<tr>
<td style="color:#888">Expectativa</td>
<td>${data.expectativa}</td>
</tr>

</table>

</td>
</tr>

<!-- SCORE -->
<tr>
<td style="padding:0 35px 30px 35px">

<div style="
background:linear-gradient(135deg,#fafafa,#f1f1f1);
border-radius:16px;
padding:35px;
text-align:center;
border:1px solid #eee
">

<p style="margin:0;color:#777;font-size:13px">
Avaliação da experiência
</p>

<p style="
margin:10px 0 0;
font-size:46px;
font-weight:700;
color:#111;
letter-spacing:-1px
">
${data.avaliacao}
</p>

<p style="margin:5px 0 0;font-size:12px;color:#999">
Escala de 0 a 10
</p>

</div>

</td>
</tr>

<!-- POSITIVOS -->
<tr>
<td style="padding:0 35px">

<h3 style="font-size:16px;margin-bottom:12px">
👍 O que o cliente gostou
</h3>

<div style="
background:#f9fafb;
padding:20px;
border-radius:12px;
border:1px solid #eee;
color:#444;
line-height:1.6
">
${data.positivos || "—"}
</div>

</td>
</tr>

<!-- MELHORIAS -->
<tr>
<td style="padding:25px 35px 35px 35px">

<h3 style="font-size:16px;margin-bottom:12px">
⚠️ O que pode melhorar
</h3>

<div style="
background:#f9fafb;
padding:20px;
border-radius:12px;
border:1px solid #eee;
color:#444;
line-height:1.6
">
${data.melhorias || "—"}
</div>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="
padding:28px;
text-align:center;
font-size:12px;
color:#999;
border-top:1px solid #eee
">

Sistema automático de feedback<br>
Picasso Bar

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