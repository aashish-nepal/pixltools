import ToolCard from "@/components/ui/ToolCard";
import type { ToolData } from "@/lib/tools-data";

interface Props {
    tools: ToolData[];
    title?: string;
    subtitle?: string;
}

export default function ToolGrid({ tools, title, subtitle }: Props) {
    return (
        <section>
            {title && (
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                ))}
            </div>
        </section>
    );
}
