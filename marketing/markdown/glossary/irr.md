# IRR — Glossary — VectorShift

> IRR, the internal rate of return, is the annualized discount rate at which the net present value of a fund's cash flows equals zero.

**Source**: [https://vectorshift.ai/glossary/irr](https://vectorshift.ai/glossary/irr)

---


[

![VectorShift](../../assets/vectorshift-wordmark_2af079f5.png)

](/)

* [Home ](/)
* [Product ](/product)
* [Use Cases ](/use-cases)
* [Security ](/security)
[Log In ](https://app.vectorshift.ai)[Request Demo ](#)

[Resources ](/resources)/ [Glossary ](/glossary)/ IRR 

# IRR . 
**Aka. **Internal rate of return 

Updated June 3, 2026 

[All terms ](/glossary)

## What is IRR? 
IRR — internal rate of return — is the annualized discount rate at which the net present value of a series of cash flows equals zero. In private markets it is the headline measure of fund and deal performance, because it captures not just how much money came back but *when *it came back. 

Unlike a simple multiple, IRR is time-sensitive. Returning 2x in three years produces a far higher IRR than returning 2x in eight years, even though the multiple is identical. That sensitivity to timing is IRR's great strength and its great weakness: it rewards speed, which is genuine value, but it can also be gamed by manipulating the timing of cash flows. 

Because the cash-flow stream alternates between negative (capital calls) and positive (distributions), IRR is solved iteratively rather than computed in closed form. Spreadsheets converge on it; there is no clean algebraic answer. 

## How IRR is calculated 
IRR is the rate *r *that satisfies a single condition across the whole cash-flow history. 

* **Lay out dated cash flows. **Every capital call is a negative flow on its date; every distribution is a positive flow on its date. 
* **Add the residual value. **The current net asset value of unrealized holdings is treated as a final positive flow at the valuation date. 
* **Solve for the rate. **Find the annualized rate that makes the present value of all those flows sum to zero. That rate is the IRR. 
While a fund is young and mostly holding unrealized positions, the IRR leans heavily on that residual NAV — an unrealized, manager-estimated number. A reported IRR is only as solid as the marks behind the NAV until cash actually returns. 

## Where IRR misleads 
IRR has well-known failure modes practitioners watch for. Early distributions — from a quick flip or a dividend recap — can inflate IRR dramatically even if the total money returned is modest, because the metric annualizes that early cash over a short period. Subscription credit lines do the same: by delaying capital calls, they shorten the time LP money is at work and lift IRR without improving the underlying deal. This is exactly why IRR is almost always read alongside a multiple like MOIC or DPI: the multiple says how much, IRR says how fast, and you need both to judge a manager. 

## Frequently *asked. *
*6 questions *01 What is the difference between IRR and MOIC? 

MOIC (multiple on invested capital) measures how much total money came back per dollar in — it ignores time entirely. IRR measures the annualized rate of return and is highly sensitive to timing. A deal can have a strong MOIC and a weak IRR if it took many years to pay off, and vice versa. 

Practitioners read them together: the multiple tells you the magnitude of the win, the IRR tells you the speed. 02 Why can't IRR be calculated directly? 

Because cash flows arrive at irregular dates and alternate in sign, there is no closed-form algebraic solution. IRR is the root of a polynomial that is solved iteratively — which is why spreadsheets compute it by convergence rather than a single formula. 03 How do subscription lines inflate IRR? 

A subscription credit line lets a fund finance deals with borrowed money first and call LP capital later. Because IRR clocks start only when LP cash is actually drawn, delaying the call shortens the period over which the return is annualized, raising the IRR — even though the underlying investment performed identically. This is why sophisticated LPs ask for IRR both with and without the effect of the credit line. 04 Is a reported IRR a realized number? 

Not until the fund is fully realized. While positions are still held, IRR depends on the residual net asset value — the manager's estimate of what unrealized holdings are worth. Early IRRs are therefore partly an opinion about marks; they firm up as distributions replace estimated value with actual cash. 05 What is gross IRR versus net IRR? 

Gross IRR is the return on the underlying investments before the GP's fees and carried interest. Net IRR is what the LP actually earns after those deductions. The gap between them is the cost of the fund, and net IRR is the only figure an LP can spend. 06 How do you defend an IRR figure to investors? 

By being able to show the cash-flow history and the valuation basis behind every mark. When the dated calls, distributions, and the diligence supporting unrealized NAV are organized and queryable, a reported IRR stops being a number on a slide and becomes a figure an LP can trace back to source. 

## Related *terms *
[

L fund economics 

#### LP advisory committee 
A committee of the fund's largest LPs that reviews conflicts and consents to key matters — the GP's <em>governance counterparty</em>, not a board. 

Open ](/glossary/lp-advisory-committee)[

P fund economics 

#### Paid-in capital 
The cumulative capital an LP has actually wired into a fund in response to calls — the <em>denominator</em> behind DPI, RVPI, and TVPI. 

Open ](/glossary/paid-in-capital)[

S fund economics 

#### Side letter 
A bilateral agreement between the fund and one LP that modifies the fund terms for that investor alone — often <em>fee breaks</em>, MFN, or co-invest rights. 

Open ](/glossary/side-letter)[

G fund economics 

#### Gross IRR 
A fund's internal rate of return <em>before</em> management fees, carried interest, and fund expenses — a read on deal-level skill, not LP outcome. 

Open ](/glossary/gross-irr)[

R fund economics 

#### Recycling provision 
An LPA clause letting a fund reinvest early proceeds rather than distribute them — effectively <em>deploying</em> more than the committed capital. 

Open ](/glossary/recycling-provision)[

N fund economics 

#### Net IRR 
The internal rate of return an LP actually earns <em>after</em> management fees, carried interest, and fund expenses — the only return figure an investor can spend. 

Open ](/glossary/net-irr)

## See how *VectorShift *works for your firm 
[Request Demo ](#)

![VectorShift](../../assets/vectorshift-wordmark-light_9f5ed477.png)

* [Product ](/product)
* [Use Cases ](/use-cases)
* [Security ](/security)
* [Resources ](/resources)
* [Docs ](https://docs.vectorshift.ai/)
* [Privacy ](/data-and-privacy)
* [Terms ](/terms-conditions)
* [contact@vectorshift.ai ](mailto:contact@vectorshift.ai)
© 2026 VectorShift, Inc. 

× 

Live Demo 

## See what your team can accomplish 
Get a personalized walkthrough from one of our experts and discover how we can help your business move faster. 

* See the platform live with your own data 
* Get answers from a product expert 
* No commitment required 

### Request a Demo 
We'll be in touch within one business day. 

First Name 

Last Name 

Work Email Please use your work email address. 

Company 

Phone Number 

🇺🇸 +1 🇬🇧 +44 🇮🇳 +91 🇦🇺 +61 🇩🇪 +49 🇫🇷 +33 🇸🇬 +65 🇦🇪 +971 🇯🇵 +81 🇨🇳 +86 🇧🇷 +55 🇳🇱 +31 🇪🇸 +34 🇮🇹 +39 🇨🇭 +41 🇸🇪 +46 🇮🇪 +353 🇭🇰 +852 

Request Demo 

By submitting you agree to our [Terms ](/terms-conditions)& [Privacy Policy ](/data-and-privacy). 

✓ 

### Thanks for reaching out 
We'll be in touch at ****within one business day to find a time. 

× 

VectorShift Research 

### Stay ahead of private markets 
Research and market intelligence for private-markets professionals. 

First Name * 

Work Email * 

Subscribe 

By subscribing, you agree to receive emails from VectorShift and to our [Privacy Policy ](/data-and-privacy). Unsubscribe anytime. 

✓ 

### You're subscribed. 
Thanks for signing up.