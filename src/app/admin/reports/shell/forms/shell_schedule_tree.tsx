'use client'

import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import { IShellScheduleTree } from '@/interfaces'

interface D3TreeProps {
  data: IShellScheduleTree
  width?: number
  height?: number
}

export const D3Tree: React.FC<D3TreeProps> = ({
  data,
  width = 1200,
  height = 800,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const gRef = useRef<SVGGElement | null>(null)

  useEffect(() => {
    if (!data || !svgRef.current || !gRef.current) return

    const margin = { top: 40, right: 90, bottom: 50, left: 90 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Create root
    const root = d3.hierarchy(data, (d) =>
      d.children?.filter(
        (child): child is IShellScheduleTree => 'children' in child
      )
    )

    const treeLayout = d3
      .tree<IShellScheduleTree>()
      .size([innerHeight, innerWidth])
    const treeData = treeLayout(root)
    const nodes = treeData.descendants()
    const links = treeData.links()

    // Clear previous content inside group (not whole SVG)
    d3.select(gRef.current).selectAll('*').remove()

    const g = d3
      .select(gRef.current)
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Draw links
    g.selectAll('.link')
      .data(links)
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .linkHorizontal<
            d3.HierarchyPointLink<IShellScheduleTree>,
            d3.HierarchyPointNode<IShellScheduleTree>
          >()
          .x((d) => d.y)
          .y((d) => d.x)
      )

    // Draw nodes
    const node = g
      .selectAll('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.y},${d.x})`)

    node.append('circle').attr('r', 5).attr('fill', '#ffcc00')

    node
      .append('text')
      .attr('dy', 4)
      .attr('x', (d) => (d.children ? -10 : 10))
      .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
      .style('font-size', '12px')
      .text((d) => d.data.id)

    // Enable zoom
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 2])
      .on('zoom', (event) => {
        d3.select(gRef.current).attr('transform', event.transform)
      })

    d3.select(svgRef.current).call(zoom)
  }, [data, width, height])

  return (
    <svg
      ref={svgRef}
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ borderRadius: 8, background: '#fff', overflow: 'visible' }}
    >
      <g ref={gRef} />
    </svg>
  )
}
