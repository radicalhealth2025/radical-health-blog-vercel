# DNS Configuration Guide

This guide provides detailed instructions for configuring DNS records for the custom domain `radicalhealing.blog`.

## Overview

To use a custom domain with Vercel, you need to configure DNS records at your domain registrar to point to Vercel's servers. This guide covers the complete process.

## Prerequisites

- Domain name registered (e.g., `radicalhealing.blog`)
- Access to domain registrar's DNS management panel
- Vercel project deployed and ready

## Step 1: Add Domain to Vercel

1. **Navigate to Domain Settings**
   - Log in to Vercel dashboard
   - Select your project: `radical-healing-blog`
   - Go to "Settings" → "Domains"

2. **Add Your Domain**
   - Click "Add Domain"
   - Enter: `radicalhealing.blog`
   - Click "Add"

3. **Add www Subdomain (Recommended)**
   - Click "Add Domain" again
   - Enter: `www.radicalhealing.blog`
   - Click "Add"
   - Choose to redirect `www` to apex domain or vice versa

## Step 2: Get DNS Configuration from Vercel

After adding the domain, Vercel will display the required DNS records. Typically:

### For Apex Domain (radicalhealing.blog)

**Option A: A Record (Recommended)**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

**Option B: CNAME Record (if supported by registrar)**
```
Type: CNAME
Name: @ (or leave blank)
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

### For www Subdomain (www.radicalhealing.blog)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

## Step 3: Configure DNS at Your Registrar

The exact steps vary by registrar. Here are instructions for common providers:

### Namecheap

1. Log in to Namecheap account
2. Go to "Domain List" → Select your domain
3. Click "Manage" → "Advanced DNS"
4. Add/Edit records:
   - **A Record**:
     - Type: `A Record`
     - Host: `@`
     - Value: `76.76.21.21`
     - TTL: `Automatic`
   - **CNAME Record**:
     - Type: `CNAME Record`
     - Host: `www`
     - Value: `cname.vercel-dns.com`
     - TTL: `Automatic`
5. Remove any conflicting records (old A or CNAME records)
6. Click "Save All Changes"

### GoDaddy

1. Log in to GoDaddy account
2. Go to "My Products" → "Domains"
3. Click "DNS" next to your domain
4. Add/Edit records:
   - **A Record**:
     - Type: `A`
     - Name: `@`
     - Value: `76.76.21.21`
     - TTL: `1 Hour`
   - **CNAME Record**:
     - Type: `CNAME`
     - Name: `www`
     - Value: `cname.vercel-dns.com`
     - TTL: `1 Hour`
5. Remove any conflicting records
6. Click "Save"

### Cloudflare

1. Log in to Cloudflare account
2. Select your domain
3. Go to "DNS" → "Records"
4. Add/Edit records:
   - **A Record**:
     - Type: `A`
     - Name: `@`
     - IPv4 address: `76.76.21.21`
     - Proxy status: `Proxied` (orange cloud) or `DNS only` (gray cloud)
     - TTL: `Auto`
   - **CNAME Record**:
     - Type: `CNAME`
     - Name: `www`
     - Target: `cname.vercel-dns.com`
     - Proxy status: `Proxied` (orange cloud) or `DNS only` (gray cloud)
     - TTL: `Auto`
5. Click "Save"

**Note**: If using Cloudflare's proxy (orange cloud), SSL/TLS mode should be set to "Full" or "Full (strict)" in SSL/TLS settings.

### Google Domains

1. Log in to Google Domains
2. Select your domain
3. Go to "DNS" in the left sidebar
4. Scroll to "Custom resource records"
5. Add/Edit records:
   - **A Record**:
     - Name: `@`
     - Type: `A`
     - TTL: `1H`
     - Data: `76.76.21.21`
   - **CNAME Record**:
     - Name: `www`
     - Type: `CNAME`
     - TTL: `1H`
     - Data: `cname.vercel-dns.com`
6. Click "Add"

### Other Registrars

For other registrars, look for:
- "DNS Management"
- "DNS Settings"
- "Name Server Management"
- "Advanced DNS"

Then add the A and CNAME records as specified above.

## Step 4: Verify DNS Configuration

### Check DNS Propagation

DNS changes can take 24-48 hours to propagate globally. Check status:

1. **Use DNS Checker Tool**
   - Visit: https://dnschecker.org
   - Enter your domain: `radicalhealing.blog`
   - Select record type: `A`
   - Verify it shows `76.76.21.21` in multiple locations

2. **Use Command Line**
   ```bash
   # Check A record
   dig radicalhealing.blog
   
   # Check CNAME record
   dig www.radicalhealing.blog
   
   # Or use nslookup
   nslookup radicalhealing.blog
   nslookup www.radicalhealing.blog
   ```

3. **Check in Vercel Dashboard**
   - Go to your project → "Settings" → "Domains"
   - Look for green checkmark next to your domain
   - If there's an error, Vercel will show specific instructions

## Step 5: Verify SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt.

1. **Wait for Certificate Provisioning**
   - After DNS propagates, Vercel will automatically request an SSL certificate
   - This usually takes 5-10 minutes after DNS is verified
   - Check status in Vercel dashboard under "Domains"

2. **Test HTTPS**
   - Visit: `https://radicalhealing.blog`
   - Verify the padlock icon appears in the browser
   - Click the padlock to view certificate details
   - Ensure certificate is issued by "Let's Encrypt"

3. **Test HTTP to HTTPS Redirect**
   - Visit: `http://radicalhealing.blog` (without 's')
   - Verify it automatically redirects to `https://radicalhealing.blog`
   - This is handled automatically by Vercel

4. **Test www Redirect**
   - Visit: `https://www.radicalhealing.blog`
   - Verify it redirects to `https://radicalhealing.blog` (or vice versa, depending on your configuration)

## Step 6: Update Application Configuration

After domain is configured and SSL is active:

1. **Update Environment Variable**
   - Go to Vercel dashboard → "Settings" → "Environment Variables"
   - Update `NEXT_PUBLIC_SITE_URL` to: `https://radicalhealing.blog`
   - Apply to: Production, Preview, Development
   - Click "Save"

2. **Redeploy Application**
   - Go to "Deployments" tab
   - Click "..." on the latest deployment
   - Click "Redeploy"
   - Or push a new commit to trigger automatic deployment

3. **Verify Metadata**
   - Visit your site: `https://radicalhealing.blog`
   - View page source (right-click → "View Page Source")
   - Check that Open Graph tags use the correct domain:
     ```html
     <meta property="og:url" content="https://radicalhealing.blog" />
     ```

## Troubleshooting

### Domain Not Verifying in Vercel

**Problem**: Vercel shows "Invalid Configuration" or "Pending Verification"

**Solutions**:
1. Wait 24-48 hours for DNS propagation
2. Verify DNS records are correct using `dig` or `nslookup`
3. Remove any conflicting DNS records (old A or CNAME records)
4. Ensure there are no AAAA records pointing elsewhere
5. Try removing and re-adding the domain in Vercel

### SSL Certificate Not Provisioning

**Problem**: HTTPS doesn't work or shows certificate error

**Solutions**:
1. Ensure DNS is fully propagated (check with dnschecker.org)
2. Wait up to 24 hours for certificate provisioning
3. Verify domain is verified in Vercel dashboard
4. Check for CAA records that might block Let's Encrypt
5. Contact Vercel support if issue persists

### Redirect Loop

**Problem**: Site keeps redirecting infinitely

**Solutions**:
1. If using Cloudflare, set SSL/TLS mode to "Full" or "Full (strict)"
2. Disable Cloudflare proxy temporarily (gray cloud)
3. Check for conflicting redirect rules in `next.config.ts`
4. Clear browser cache and cookies

### www Not Working

**Problem**: www subdomain doesn't resolve or redirect

**Solutions**:
1. Verify CNAME record for `www` is correct
2. Ensure `www.radicalhealing.blog` is added in Vercel domains
3. Check DNS propagation for www subdomain
4. Configure redirect preference in Vercel (www → apex or apex → www)

### Mixed Content Warnings

**Problem**: Browser shows "Not Secure" or mixed content warnings

**Solutions**:
1. Ensure all resources (images, scripts, styles) use HTTPS URLs
2. Update hardcoded HTTP URLs to HTTPS
3. Use protocol-relative URLs: `//example.com/image.jpg`
4. Check browser console for specific mixed content errors

## DNS Record Reference

### Complete DNS Configuration

For `radicalhealing.blog`:

| Type | Name | Value | TTL | Priority |
|------|------|-------|-----|----------|
| A | @ | 76.76.21.21 | 3600 | - |
| CNAME | www | cname.vercel-dns.com | 3600 | - |

### Optional Records

**Email (if using email service)**:
| Type | Name | Value | TTL | Priority |
|------|------|-------|-----|----------|
| MX | @ | mail.example.com | 3600 | 10 |

**SPF (for email)**:
| Type | Name | Value | TTL |
|------|------|-------|-----|
| TXT | @ | v=spf1 include:_spf.example.com ~all | 3600 |

## Security Considerations

1. **HTTPS Only**
   - Always use HTTPS URLs
   - Vercel automatically redirects HTTP to HTTPS

2. **HSTS (HTTP Strict Transport Security)**
   - Vercel automatically enables HSTS
   - Browsers will always use HTTPS after first visit

3. **CAA Records (Optional)**
   - Restrict which Certificate Authorities can issue certificates
   - Example:
     ```
     Type: CAA
     Name: @
     Value: 0 issue "letsencrypt.org"
     ```

4. **DNSSEC (Optional)**
   - Enable DNSSEC at your registrar for additional security
   - Protects against DNS spoofing attacks

## Monitoring

### Set Up Monitoring

1. **Uptime Monitoring**
   - Use services like UptimeRobot, Pingdom, or StatusCake
   - Monitor: `https://radicalhealing.blog`
   - Alert on downtime or slow response times

2. **SSL Certificate Monitoring**
   - Monitor certificate expiration
   - Vercel auto-renews, but good to monitor
   - Use tools like SSL Labs: https://www.ssllabs.com/ssltest/

3. **DNS Monitoring**
   - Monitor DNS resolution
   - Alert on DNS changes or failures

## Maintenance

### Regular Checks

- [ ] Verify SSL certificate is valid and not expiring soon
- [ ] Check DNS records haven't been modified
- [ ] Test site accessibility from different locations
- [ ] Monitor site performance and uptime
- [ ] Review Vercel deployment logs for errors

### Annual Tasks

- [ ] Review and renew domain registration
- [ ] Audit DNS records and remove unused ones
- [ ] Review SSL/TLS configuration
- [ ] Update contact information at registrar

## Support Resources

- **Vercel DNS Documentation**: https://vercel.com/docs/concepts/projects/domains
- **Vercel SSL Documentation**: https://vercel.com/docs/concepts/projects/domains/ssl
- **DNS Checker**: https://dnschecker.org
- **SSL Labs Test**: https://www.ssllabs.com/ssltest/
- **Vercel Support**: https://vercel.com/support
