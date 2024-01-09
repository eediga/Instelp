package Test;

import java.io.IOException;
import java.util.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/matrix1")
public class Trial {

    private static int INFINITY = 100000000;
    static int ar[];
    static int adjacencyMatrix[][];
    
    private static class Index {
        int currentVertex;
        Set<Integer> vertexSet;

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            Index index = (Index) o;

            if (currentVertex != index.currentVertex) return false;
            return !(vertexSet != null ? !vertexSet.equals(index.vertexSet) : index.vertexSet != null);
        }

        @Override
        public int hashCode() {
            int result = currentVertex;
            result = 31 * result + (vertexSet != null ? vertexSet.hashCode() : 0);
            return result;
        }

        private static Index createIndex(int vertex, Set<Integer> vertexSet) {
            Index i = new Index();
            i.currentVertex = vertex;
            i.vertexSet = vertexSet;
            return i;
        }
    }

    private static class SetSizeComparator implements Comparator<Set<Integer>>{
        @Override
        public int compare(Set<Integer> o1, Set<Integer> o2) {
            return o1.size() - o2.size();
        }
    }

    public static int minCost(int[][] distance) {

        //stores intermediate values in map
        Map<Index, Integer> minCostDP = new HashMap<>();
        Map<Index, Integer> parent = new HashMap<>();
        
        System.out.println("distance.lenght "+distance.length);
        List<Set<Integer>> allSets = generateCombination(distance.length - 1);
        for(int i=0;i<allSets.size();i++)
        {
        	System.out.println("    *"+allSets.get(i));
        }
        
        for(Set<Integer> set : allSets) {
            for(int currentVertex = 1; currentVertex < distance.length; currentVertex++) {
                if(set.contains(currentVertex)) {
                    continue;
                }
                Index index = Index.createIndex(currentVertex, set);
                int minCost = INFINITY;
                int minPrevVertex = 0;
                //to avoid ConcurrentModificationException copy set into another set while iterating
                Set<Integer> copySet = new HashSet<>(set);
                for(int prevVertex : set) {
                    int cost = distance[prevVertex][currentVertex] + getCost(copySet, prevVertex, minCostDP);
                    if(cost < minCost) {
                        minCost = cost;
                        minPrevVertex = prevVertex;
                    }
                }
                //this happens for empty subset
                if(set.size() == 0) {
                    minCost = distance[0][currentVertex];
                }
                minCostDP.put(index, minCost);
                parent.put(index, minPrevVertex);
            }
        }

        Set<Integer> set = new HashSet<>();
        for(int i=1; i < distance.length; i++) {
            set.add(i);
        }
        int min = Integer.MAX_VALUE;
        int prevVertex = -1;
        //to avoid ConcurrentModificationException copy set into another set while iterating
        Set<Integer> copySet = new HashSet<>(set);
        for(int k : set) {
            int cost = distance[k][0] + getCost(copySet, k, minCostDP);
            if(cost < min) {
                min = cost;
                prevVertex = k;
            }
        }

        parent.put(Index.createIndex(0, set), prevVertex);
        printTour(parent, distance.length);
        return min;
    }

    private static void printTour(Map<Index, Integer> parent, int totalVertices) {
        Set<Integer> set = new HashSet<>();
        for(int i=0; i < totalVertices; i++) {
            set.add(i);
        }
        Integer start = 0;
        Deque<Integer> stack = new LinkedList<>();
        while(true) {
            stack.push(start);
            System.out.println(start+" Start");
            set.remove(start);
            start = parent.get(Index.createIndex(start, set));
            if(start == null) {
                break;
            }
        }
        StringJoiner joiner = new StringJoiner("->");
        stack.forEach(v -> joiner.add(String.valueOf(v)));
        System.out.println("\nTSP tour");
        String join = joiner.toString();
        String[] arrayToSend = join.split("->");
        for(int i=0;i<arrayToSend.length-1;i++)
        {
        	System.out.println(" "+arrayToSend[i]);
        }
    }

    private static int getCost(Set<Integer> set, int prevVertex, Map<Index, Integer> minCostDP) {
        set.remove(prevVertex);
        Index index = Index.createIndex(prevVertex, set);
        int cost = minCostDP.get(index);
        set.add(prevVertex);
        return cost;
    }

    private static List<Set<Integer>> generateCombination(int n) {
        int input[] = new int[n];
        for(int i = 0; i < input.length; i++) {
            input[i] = i+1;
        }
        List<Set<Integer>> allSets = new ArrayList<>();
        int result[] = new int[input.length];
        generateCombination(input, 0, 0, allSets, result);
        Collections.sort(allSets, new SetSizeComparator());
        return allSets;
    }

    private static void generateCombination(int input[], int start, int pos, List<Set<Integer>> allSets, int result[]) {
        if(pos == input.length) {
            return;
        }
        Set<Integer> set = createSet(result, pos);
        allSets.add(set);
        for(int i=start; i < input.length; i++) {
            result[pos] = input[i];
            generateCombination(input, i+1, pos+1, allSets, result);
        }
    }

    private static Set<Integer> createSet(int input[], int pos) {
        if(pos == 0) {
            return new HashSet<>();
        }
        Set<Integer> set = new HashSet<>();
        for(int i = 0; i < pos; i++) {
            set.add(input[i]);
        }
        return set;
    }
    
    @Path("/acceptMatrix")
	@POST	
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public static int AcceptMatrix(Matrix matrix) throws IOException{
		System.out.println("inside matrix");
		int k = (int) Math.sqrt(matrix.getMatrix().size());
		System.out.println("k: "+k);
		
		adjacencyMatrix = new int[k][k];
		ar = new int[k*k];
		int count=0;
		
		for(int i=0;i< matrix.getMatrix().size();i++)
		{
		System.out.println( matrix.getMatrix().size()+"   ");
			String d = matrix.getMatrix().get(i).replaceAll("  mins","");
			int num = Integer.parseInt(d);
			System.out.println("mun: "+num);
			ar[i] = num;
			System.out.println("ar[i]: "+ar[i]);
		}	
			for(int i=0;i<k;i++)
			{
				for(int j=0;j<k;j++)
				{
					adjacencyMatrix[i][j]=ar[count];
					count++;
				}
					
			}

		System.out.println("I think this should print");
		for(int o=0;o<k;o++)
		{
			for(int p=0;p<k;p++)
			{
				System.out.print(adjacencyMatrix[o][p]+"   ");
			}
			System.out.println();
		}
		minCost(adjacencyMatrix);

		return 1;
    }
}
