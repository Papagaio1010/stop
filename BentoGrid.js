import React from 'react';
import { cn } from '../../lib/utils';
export function BentoGrid({ children, className = '' }) {
    return (<div data-promptui-id="promptui-components-magic-bentogrid-div-1" className={cn('grid grid-cols-1 gap-4 md:grid-cols-6', className)}>
      {children}
    </div>);
}
export function BentoCard({ title, description, icon, meta, children, className = '', span = 'md:col-span-2', }) {
    return (<article data-promptui-id="promptui-components-magic-bentogrid-article-2" className={cn('group relative min-h-44 overflow-hidden rounded-2xl border border-[hsl(var(--border))]', 'bg-[hsl(var(--card)_/_0.82)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl', 'before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)_/_0.14),transparent_36%)]', span, className)}>
      <div data-promptui-id="promptui-components-magic-bentogrid-div-3" className="relative z-10 flex h-full flex-col">
        {(icon || meta) ? (<div data-promptui-id="promptui-components-magic-bentogrid-div-4" className="mb-4 flex items-center justify-between gap-3">
            {icon ? (<div data-promptui-id="promptui-components-magic-bentogrid-div-5" className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)_/_0.12)] text-[hsl(var(--primary))]">
                {icon}
              </div>) : <span />}
            {meta ? <span data-promptui-id="promptui-components-magic-bentogrid-span-7" className="text-xs font-medium text-[hsl(var(--muted-foreground))]">{meta}</span> : null}
          </div>) : null}
        {title ? <h3 data-promptui-id="promptui-components-magic-bentogrid-h3-8" className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">{title}</h3> : null}
        {description ? <p data-promptui-id="promptui-components-magic-bentogrid-p-9" className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{description}</p> : null}
        {children ? <div data-promptui-id="promptui-components-magic-bentogrid-div-10" className="mt-5 flex-1">{children}</div> : null}
      </div>
    </article>);
}

export default BentoGrid;
